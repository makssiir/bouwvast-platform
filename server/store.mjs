import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { randomBytes } from "node:crypto"

const ID = /^[0-9a-f-]{36}$/i

/**
 * Durable lead storage on disk: one directory per lead id.
 *
 *   data/leads/<id>/lead.json     the validated lead + receipt + status
 *   data/leads/<id>/photo-1.jpg   uploaded photos
 *
 * The id comes from the visitor's browser, so a retried submission lands on
 * the same directory and gets the original receipt back (idempotency).
 * Writes go to a temp file first and are renamed, so a crash never leaves a
 * half-written lead.json.
 */
export function createStore(dataDir) {
  const root = join(dataDir, "leads")

  const dirFor = (id) => {
    if (!ID.test(id)) throw new Error("invalid lead id")
    return join(root, id.toLowerCase())
  }

  async function writeAtomic(file, data) {
    const tmp = `${file}.${randomBytes(4).toString("hex")}.tmp`
    await writeFile(tmp, data, { mode: 0o600 })
    await rename(tmp, file)
  }

  return {
    root,

    async init() {
      await mkdir(root, { recursive: true, mode: 0o700 })
    },

    async get(id) {
      try {
        return JSON.parse(await readFile(join(dirFor(id), "lead.json"), "utf8"))
      } catch (error) {
        if (error.code === "ENOENT") return null
        throw error
      }
    },

    /** Stores a new lead with its photos. Returns false if the id already exists. */
    async create(record, photos) {
      const dir = dirFor(record.lead.id)
      try {
        await mkdir(dir, { mode: 0o700 })
      } catch (error) {
        if (error.code === "EEXIST") return false
        throw error
      }
      const files = []
      for (const [index, photo] of photos.entries()) {
        const name = `photo-${index + 1}.${photo.ext}`
        await writeFile(join(dir, name), photo.bytes, { mode: 0o600 })
        files.push({ name, type: photo.type, size: photo.bytes.length, originalName: photo.originalName })
      }
      await writeAtomic(join(dir, "lead.json"), JSON.stringify({ ...record, photos: files }, null, 2))
      return true
    },

    async update(id, patch) {
      const current = await this.get(id)
      if (!current) return null
      const next = { ...current, ...patch }
      await writeAtomic(join(dirFor(id), "lead.json"), JSON.stringify(next, null, 2))
      return next
    },

    async readPhoto(id, name) {
      return readFile(join(dirFor(id), name))
    },

    async list() {
      let entries = []
      try {
        entries = await readdir(root)
      } catch (error) {
        if (error.code === "ENOENT") return []
        throw error
      }
      const records = []
      for (const entry of entries) {
        if (!ID.test(entry)) continue
        const record = await this.get(entry).catch(() => null)
        if (record) records.push(record)
      }
      return records
    },

    /** Deletes leads older than the retention period (privacy statement). */
    async purgeOlderThan(days, now = Date.now()) {
      const cutoff = now - days * 24 * 60 * 60 * 1000
      let removed = 0
      for (const record of await this.list()) {
        const received = Date.parse(record.receivedAt)
        if (Number.isFinite(received) && received < cutoff) {
          await rm(dirFor(record.lead.id), { recursive: true, force: true })
          removed += 1
        }
      }
      return removed
    },

    async isWritable() {
      try {
        await stat(root)
        const probe = join(root, `.probe-${randomBytes(4).toString("hex")}`)
        await writeFile(probe, "")
        await rm(probe)
        return true
      } catch {
        return false
      }
    },
  }
}
