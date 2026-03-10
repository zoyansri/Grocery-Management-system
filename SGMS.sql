-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: Grocery_Store
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ids`
--

DROP TABLE IF EXISTS `ids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ids` (
  `UniqueID` int NOT NULL,
  `Customer_Name` varchar(30) DEFAULT NULL,
  `CustomerID` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`UniqueID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ids`
--

LOCK TABLES `ids` WRITE;
/*!40000 ALTER TABLE `ids` DISABLE KEYS */;
/*!40000 ALTER TABLE `ids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `InventoryID` varchar(10) NOT NULL,
  `ProductID` varchar(10) DEFAULT NULL,
  `MachineID` varchar(10) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Expiry` date DEFAULT NULL,
  PRIMARY KEY (`InventoryID`),
  KEY `ProductID` (`ProductID`),
  KEY `MachineID` (`MachineID`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`MachineID`) REFERENCES `vendings` (`MachineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('I001','P003','M001',80,'2030-01-01'),('I002','P007','M002',40,'2028-06-03'),('I003','P012','M009',20,'2029-07-27'),('I004','P006','M003',15,'2027-09-18'),('I005','P005','M004',30,'2028-04-20'),('I006','P010','M012',10,'2035-07-03'),('I007','P001','M005',50,'2025-12-23'),('I008','P008','M006',35,'2026-06-12'),('I009','P009','M011',30,'2031-08-16'),('I010','P004','M007',20,'2025-12-10'),('I011','P002','M008',18,'2027-10-31'),('I012','P011','M010',40,'2026-01-01');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductID` varchar(10) NOT NULL,
  `Product_Name` varchar(30) DEFAULT NULL,
  `Barcode` varchar(20) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Expiry` date DEFAULT NULL,
  `Price` double DEFAULT NULL,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('P001','Milk','BA0010',5,'2025-08-15',45),('P002','Juice','C003',7,'2026-03-20',80),('P003','Batteries','BA0001',10,'2027-01-10',50),('P004','Bread','BA900',8,'2025-10-13',30),('P005','Sauce','BA0024',1,'2026-10-21',170),('P006','Cosmetics','BA0008',2,'2026-06-05',500),('P007','Shampoo','BA0004',1,'2026-06-15',180),('P008','Candy','C0006',2,'2025-12-31',50),('P009','Spices','C0004',30,'2027-04-29',250),('P010','Bandages','BA0006',30,'2028-07-05',10),('P011','Fruits','D0904',50,'2025-11-01',280),('P012','Cleaning','BA0012',30,'2026-08-23',30);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `TransactionID` int NOT NULL AUTO_INCREMENT,
  `UniqueID` int DEFAULT NULL,
  `ProductID` varchar(10) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `UniqueID` (`UniqueID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`UniqueID`) REFERENCES `ids` (`UniqueID`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendings`
--

DROP TABLE IF EXISTS `vendings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendings` (
  `MachineID` varchar(10) NOT NULL,
  `Location` varchar(10) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`MachineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendings`
--

LOCK TABLES `vendings` WRITE;
/*!40000 ALTER TABLE `vendings` DISABLE KEYS */;
INSERT INTO `vendings` VALUES ('M001','LL-1','Working'),('M002','LL-2','Working'),('M003','LR-1','Not-Working'),('M004','LR-2','Not-Working'),('M005','RL-1','Working'),('M006','RL-2','Working'),('M007','RR-1','Not-Working'),('M008','RR-2','Not-Working'),('M009','LL-3','Working'),('M010','RR-3','Working'),('M011','RL-3','Working'),('M012','LR-3','Working');
/*!40000 ALTER TABLE `vendings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-16 23:09:12
