-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "askingPrice" DOUBLE PRECISION NOT NULL,
    "transactionOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "embeddings" JSONB NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIExtractedInfo" (
    "id" SERIAL NOT NULL,
    "aiModel" TEXT,
    "streetWithHouseNumber" TEXT,
    "cityWithPostalCode" TEXT,
    "agentBroker" TEXT,
    "owner" TEXT,
    "parcelNumber" TEXT,
    "propertyArea" DOUBLE PRECISION,
    "buildingVolume" DOUBLE PRECISION,
    "buildingInsuranceValue" DOUBLE PRECISION,
    "yearOfConstruction" INTEGER,
    "lastMajorRenovation" INTEGER,
    "numberOfRentalUnits" INTEGER,
    "heatingSystem" TEXT,
    "formOfOwnership" TEXT,
    "dealStructure" TEXT,
    "vacancyPerAnnum" DOUBLE PRECISION,
    "actualNetRentalIncomePa" DOUBLE PRECISION,
    "propertyExpensesPa" DOUBLE PRECISION,
    "askingSalePrice" DOUBLE PRECISION,
    "fileId" INTEGER NOT NULL,

    CONSTRAINT "AIExtractedInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIExtractedInfo" ADD CONSTRAINT "AIExtractedInfo_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
