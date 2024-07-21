/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userId_fkey";

-- DropTable
DROP TABLE "Friend";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "yourName" TEXT NOT NULL,
    "yourEmail" TEXT NOT NULL,
    "friendsName" TEXT NOT NULL,
    "friendsEmail" TEXT NOT NULL,
    "courseID" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_yourEmail_key" ON "Enrollment"("yourEmail");
