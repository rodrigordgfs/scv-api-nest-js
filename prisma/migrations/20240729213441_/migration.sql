/*
  Warnings:

  - You are about to drop the column `priceSale` on the `product` table. All the data in the column will be lost.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "unity_id" TEXT NOT NULL,
    CONSTRAINT "product_unity_id_fkey" FOREIGN KEY ("unity_id") REFERENCES "unity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product" ("id", "name", "unity_id") SELECT "id", "name", "unity_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
