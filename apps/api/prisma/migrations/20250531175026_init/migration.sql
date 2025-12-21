-- CreateEnum
CREATE TYPE "ArtistType" AS ENUM ('SOLO', 'BAND', 'ORCHESTRA', 'CHOIR', 'VARIOUS');

-- CreateEnum
CREATE TYPE "ShareType" AS ENUM ('wishlist', 'collection', 'both');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('mint', 'very_good', 'good', 'fair', 'poor');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth0Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VinylRecord" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "genreId" TEXT,
    "styleId" TEXT,
    "artistId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VinylRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VinylVariant" (
    "id" TEXT NOT NULL,
    "vinylId" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "coverImage" TEXT,
    "recordColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VinylVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVinyl" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "condition" "Condition",
    "purchaseDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVinyl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Style" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "durationInSeconds" INTEGER,
    "side" TEXT,
    "mixedBy" TEXT,
    "engineeredBy" TEXT,
    "writtenBy" TEXT,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "genreId" TEXT,
    "country" TEXT,
    "type" "ArtistType" NOT NULL DEFAULT 'SOLO',
    "formedDate" TIMESTAMP(3),
    "disbandDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "deathDate" TIMESTAMP(3),
    "country" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistMember" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "role" TEXT,
    "joinDate" TIMESTAMP(3),
    "leaveDate" TIMESTAMP(3),
    "foundingMember" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtistMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistAlias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "ArtistAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vinylId" TEXT NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionShare" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shareToken" TEXT NOT NULL,
    "password" TEXT,
    "shareType" "ShareType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "CollectionShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserVinyl_userId_variantId_key" ON "UserVinyl"("userId", "variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Style_name_key" ON "Style"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistMember_artistId_personId_joinDate_key" ON "ArtistMember"("artistId", "personId", "joinDate");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionShare_shareToken_key" ON "CollectionShare"("shareToken");

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VinylRecord" ADD CONSTRAINT "VinylRecord_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VinylVariant" ADD CONSTRAINT "VinylVariant_vinylId_fkey" FOREIGN KEY ("vinylId") REFERENCES "VinylRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVinyl" ADD CONSTRAINT "UserVinyl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVinyl" ADD CONSTRAINT "UserVinyl_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "VinylVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "VinylVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistMember" ADD CONSTRAINT "ArtistMember_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistMember" ADD CONSTRAINT "ArtistMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistAlias" ADD CONSTRAINT "ArtistAlias_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_vinylId_fkey" FOREIGN KEY ("vinylId") REFERENCES "VinylRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionShare" ADD CONSTRAINT "CollectionShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
