/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sale_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `seller` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `unity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CategoryToProduct" ("A", "B") SELECT "A", "B" FROM "_CategoryToProduct";
DROP TABLE "_CategoryToProduct";
ALTER TABLE "new__CategoryToProduct" RENAME TO "_CategoryToProduct";
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "zipCode" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "sellerId" TEXT,
    "clientId" TEXT,
    CONSTRAINT "address_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_address" ("clientId", "complement", "country", "district", "id", "number", "sellerId", "state", "street", "zipCode") SELECT "clientId", "complement", "country", "district", "id", "number", "sellerId", "state", "street", "zipCode" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE UNIQUE INDEX "address_sellerId_key" ON "address"("sellerId");
CREATE UNIQUE INDEX "address_clientId_key" ON "address"("clientId");
CREATE TABLE "new_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_category" ("id", "name") SELECT "id", "name" FROM "category";
DROP TABLE "category";
ALTER TABLE "new_category" RENAME TO "category";
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");
CREATE TABLE "new_client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);
INSERT INTO "new_client" ("cpf", "id", "name") SELECT "cpf", "id", "name" FROM "client";
DROP TABLE "client";
ALTER TABLE "new_client" RENAME TO "client";
CREATE UNIQUE INDEX "client_name_key" ON "client"("name");
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");
CREATE TABLE "new_product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceSale" DECIMAL NOT NULL,
    "unity_id" TEXT NOT NULL,
    CONSTRAINT "product_unity_id_fkey" FOREIGN KEY ("unity_id") REFERENCES "unity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_product" ("id", "name", "priceSale", "unity_id") SELECT "id", "name", "priceSale", "unity_id" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
CREATE TABLE "new_sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toDelivery" BOOLEAN NOT NULL,
    "delivered" BOOLEAN NOT NULL,
    "clientId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sale" ("clientId", "date", "delivered", "id", "sellerId", "toDelivery") SELECT "clientId", "date", "delivered", "id", "sellerId", "toDelivery" FROM "sale";
DROP TABLE "sale";
ALTER TABLE "new_sale" RENAME TO "sale";
CREATE TABLE "new_sale_item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" DECIMAL NOT NULL,
    "quantity" DECIMAL NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "sale_item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sale_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sale_item" ("id", "price", "productId", "quantity", "saleId") SELECT "id", "price", "productId", "quantity", "saleId" FROM "sale_item";
DROP TABLE "sale_item";
ALTER TABLE "new_sale_item" RENAME TO "sale_item";
CREATE TABLE "new_seller" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_seller" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "seller";
DROP TABLE "seller";
ALTER TABLE "new_seller" RENAME TO "seller";
CREATE UNIQUE INDEX "seller_name_key" ON "seller"("name");
CREATE UNIQUE INDEX "seller_userId_key" ON "seller"("userId");
CREATE TABLE "new_unity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_unity" ("id", "name") SELECT "id", "name" FROM "unity";
DROP TABLE "unity";
ALTER TABLE "new_unity" RENAME TO "unity";
CREATE UNIQUE INDEX "unity_name_key" ON "unity"("name");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL
);
INSERT INTO "new_user" ("email", "enabled", "id", "password") SELECT "email", "enabled", "id", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
