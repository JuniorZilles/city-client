DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(150) NOT NULL,
  `gender` enum('Masculino','Feminino','Outro','Prefiro não dizer') NOT NULL,
  `birthday` datetime NOT NULL,
  `age` int NOT NULL,
  `city` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `city` (`city`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`city`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

