-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_manuscripts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "manuscripts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "manuscripts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_manuscripts" ("file_url", "id", "projectId", "title", "userId") SELECT "file_url", "id", "projectId", "title", "userId" FROM "manuscripts";
DROP TABLE "manuscripts";
ALTER TABLE "new_manuscripts" RENAME TO "manuscripts";
CREATE UNIQUE INDEX "manuscripts_projectId_key" ON "manuscripts"("projectId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
