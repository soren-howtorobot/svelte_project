/*
  Warnings:

  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `content` VARCHAR(2000) NOT NULL,
    ADD COLUMN `created_at` INTEGER NOT NULL;
