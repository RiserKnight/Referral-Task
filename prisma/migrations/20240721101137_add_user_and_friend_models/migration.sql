-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "yourName" TEXT NOT NULL,
    "yourEmail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "friendsName" TEXT NOT NULL,
    "friendsEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_yourEmail_key" ON "User"("yourEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_friendsEmail_key" ON "Friend"("friendsEmail");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
