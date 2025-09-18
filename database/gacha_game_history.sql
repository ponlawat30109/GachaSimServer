-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gacha_game
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `item_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,'Player93038469','Steel Shield','2025-09-06 17:25:32'),(2,'Player93038469','Leather Boots','2025-09-06 17:25:32'),(3,'Player93038469','Wooden Stick','2025-09-06 17:25:32'),(4,'Player93038469','Steel Shield','2025-09-06 17:25:32'),(5,'Player93038469','Wooden Stick','2025-09-06 17:25:32'),(6,'Player93038469','Legendary Sword','2025-09-06 17:25:32'),(7,'Player93038469','Steel Shield','2025-09-06 17:25:32'),(8,'Player93038469','Magic Wand','2025-09-06 17:25:32'),(9,'Player93038469','Magic Wand','2025-09-06 17:25:32'),(10,'Player93038469','Magic Wand','2025-09-06 17:25:32'),(11,'Player93038469','Leather Boots','2025-09-06 17:25:43'),(12,'Player93038469','Wooden Stick','2025-09-06 17:25:43'),(13,'Player93038469','Legendary Sword','2025-09-06 17:25:43'),(14,'Player93038469','Steel Shield','2025-09-06 17:25:43'),(15,'Player93038469','Wooden Stick','2025-09-06 17:25:43'),(16,'Player93038469','Leather Boots','2025-09-06 17:25:43'),(17,'Player93038469','Leather Boots','2025-09-06 17:25:43'),(18,'Player93038469','Wooden Stick','2025-09-06 17:25:43'),(19,'Player93038469','Steel Shield','2025-09-06 17:25:43'),(20,'Player93038469','Steel Shield','2025-09-06 17:25:43');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-07  0:56:19
