-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: i69n16bijd6tjp7l
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attendee_login_id` int(11) DEFAULT NULL,
  `convention_id` int(11) DEFAULT NULL,
  `seat_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,7,6,229),(2,7,6,231),(3,5,6,204),(4,4,6,194),(5,5,6,183),(6,7,6,223),(7,6,6,191),(8,6,6,181);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convention`
--

DROP TABLE IF EXISTS `convention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convention` (
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `invitationOnly` tinyint(1) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convention`
--

LOCK TABLES `convention` WRITE;
/*!40000 ALTER TABLE `convention` DISABLE KEYS */;
INSERT INTO `convention` VALUES ('Quasidisastrous Prelegal Cheetah of The Seven Kingdoms','Rucfamoje tigouwo tot me dup va bidcid lowlecnag enufih mebozuj bogvi lus heoca fojo cupderrat silmi ihepo. Nebi diw zemer soblih lejas tewvenok ti papruciw den cuibpo ticuwi luc adefuf ubicij. Done gikod cazam icirog eto odiobado somamzec gusheded rajcoz','2018-06-15 12:26:06','2018-06-15 13:49:43',0,1,2),('Ministerial Oxymoronic Purplemarten The Great','Idpeh fecmis ica ehiijlif turwicelo lomet of nobe apodennos osegi heogmo cigjag wep alo. Ticketibo dikaraf umzarit nekca mapzoil gikto gig cepgutif zosgo pisdege dimof hetore zo dehla doehiozo mijofa. Feproc toname hidve aveoh momo lopa ma rod wohpeh ser ','2018-07-25 22:38:19','2018-07-26 00:27:02',0,2,1),('The Sad Story of Affluent Sinful Lorikeet','Jed hizihne cighowoc jogedi daso godipa mupe meji roho ohufuvcif tehno evo zesij ucise jeseha ziije ep nenig. Jupzuldid vid fivov deihko ute wevut coj pimo ortidkip mahwev vogje heko nu ur fecewnu sigzesi. Kedodkom otzewze teve cafohok jofcuc geftaja jonw','2018-12-11 10:25:00','2018-12-11 13:35:44',0,3,1),('Groovelike Coverable Southernhairnosedwombat The Great','Dewga za gij fav sejsu iteasdam peod ogowuskod orohavi duuc gozcepov tipog duiw recton hodne erpatu raozvod. Vonegiwi techo voczud hejib soerowo bu tepaha focziwani cuw azi ikliwha kuh kiwunla jepgoore hovug fi semoc. Lokuohi pekim jolokte pilsocibu pil e','2018-06-28 04:23:11','2018-06-28 04:34:03',0,4,4),('The Adventure of Unsinkable Craniological Gnat','Nijve dobnurohu ufib tosroab zil puhkerzos cipalike tomfaciki helciti jusko nofgido ocihoso lud. Ukosej ridarici ejozo kesbi fezdov arzeh zokik se resuk ila rupri gemno nimifgo. Onippil jiswep no empejkan vulwo irvor eckoaci reap otvet upi za evupop za em','2018-01-18 17:37:13','2018-01-18 18:08:57',0,5,4),('The Adventure of Rational Anarthrous Oyster','Otija hicmeajo mugaj gudca iwisev gapoc co te jucew feopufop kon nisi hen weszo fim boskawem daeve. Ole iruris jolo kurri cove pefi cef ji cinoamo teopelo wig vobcaw ugoje mawka osecip ban. Ipeevhu conket daceh tow rizojo okujaf piw ja koez higten gamrivi','2017-12-25 03:05:48','2017-12-25 06:11:34',0,6,3),('The Adventure of Touchy Receptive Alpineroadguidetigerbeetle','Tisurapo ji aclam majma jourehar wo ilafet jowleweg kihed ce jag kecavma noj odora ejobe. Comilumat go tolaf saihito maknaris ehidatel ge bemtefep wo cenka arudo to wih dakuco rewu dojolic ebna tadez. Ju zawogabo erge pi vu jelnomkin ele ce am finuvtoh wa','2018-08-21 15:22:45','2018-08-21 19:18:27',0,7,1),('The Tales of Sociophobic Undespised Amazonparrot','Voha jidufdew jondidjuj ni onwaori felje am neb zo egfotce ovelid fitwop po fogsih ed. Ewrasoh do gasiv wit nokki ceviwlid zowsi midihewa imipat ditokzih wir ib fuagiap lal jadew wiluode hedse oro. Sudfor ede tisvesek segvalaw kev redogo ejaw fecheco ra w','2018-11-20 21:07:29','2018-11-20 21:51:17',0,8,4),('The Sad Story of Unskillful Preachy Fowl','Sorre tivgugu doncus vi ziw mu apohotlo tiuljur ijnir wijo boep pah lunodsis. Kirizho liiwe viuzo kopaneeha ce ol or nemurhe ide sufsi ci diwe efaces mot piti fapjen. Miv tidepoevi af leabewo locpe wicveh dagike idhek rizof vih nefuka arwul jene udekoseci','2018-06-26 07:41:58','2018-06-26 10:21:18',0,9,1),('Freaky Uninfested Brownbutterfly The Great','Vatotme faja zuhfa rejfihdu hego ritli zecuvo nuze segpeme pimode totce edecuz duiv vudu zub. Calewilo wesdo kijha ladzom jolob nisroaj geklo pidbe ehatu nokrut dajlun bivid relav vuco rovot di. Mesloz olonedek magja ceimi ijibe pa tinom detdut tevuco uvi','2018-09-09 23:23:32','2018-09-10 03:03:01',0,10,4),('The Adventure of Phlogopite Genius Americanpainthorse','Efjut acu tofu ruzoc vuna hisko bo vikcej wojo dotde zodfajebo mirdof vovugcop oc wor. Foge hiweh vohihure zacelal mias jot eluceuvi hacosot ocijilgo vehezpoz kuctet pofkemim. Ewfes burne diko gucheha idovanot binehe ratvis posid vonij imveco gogmiv eso s','2018-03-13 04:44:19','2018-03-13 04:58:12',0,11,1),('The Tales of Avengeful Stunty Armedcrab','Jarohuf aha tepekis catmembit je befa jo pab tejo jaso suv umohis laciso cuhal pepuzu pespom. Lelekso pineh bafrono giogu digo sil mif suwpo jo opro vif movur go buroz. De misen lovin saltivup jirgipoj az levti genif vupid fofi wese jucaj ugi ukafo kadzor','2018-06-24 15:52:38','2018-06-24 15:52:44',0,12,4),('Pentagonal Frogged Horseshoecrab The Great','Ahi mij zew top ziso kojwe tew loogso vewidi guuc piwnez it joshevan dupiw holaaz rel foikitu. Lowjekniw feljo fakfus abeza ati vohpi ere diuwo ze odiigi rovirir hedihu mezec ugemop mopo ba butwi. Wewmut siwoljoj forisoz kefbuke fe en hehofto vupvow revam','2018-07-31 06:44:02','2018-07-31 07:41:23',0,13,2),('Selftaught Unartistic Gopher of The Seven Kingdoms','Lidec otlo ci wuju jezkog gejcep oleogoem do opofuhma diruhpoh relaad baszamnid ofo ri ihvej. Cimho lo getel goratwe tec lopuk uliiwasid ujtirrej dipbaz fabruvuw jane napihpa lisovu bahaho eptulvof etefid ubesel galih. Il ivekej takomzuh gojrob acsiodo lo','2018-03-03 23:37:23','2018-03-04 02:36:37',0,14,2),('The Sad Story of Salted Bacciferous Megalosaurus','Ewza ilde je seipi fehov dipa pagol poodi domri mom rinte oki es saha rebju zep idrid si. Vohoz wuwpom cukiksir riaciip zutidwi ri ruvow zem bolijpar mawoco bik upal oktiv miziin evozodwa ecegen jihzo hepuhki. Weed dih igpuv do icmig nirsuh hodzer tippufn','2017-12-19 22:59:34','2017-12-20 00:11:18',0,15,2),('Bort Cretaceous Horse The Great','Ropof cuwicuz suzoeze dohisi cotdac mugic sa ohoacukil imedimo muko dokre umitu vian ohe et izugowjo. Rosnifvo novisnif solakato oswosik toge reak wutnocwug awoah hamca se aztahac novo wupe ok wipod argebpi bijlezi. Hozi ruewo reeg tejotu hi sif ni dilhul','2018-11-24 02:09:10','2018-11-24 03:40:02',0,16,4);
/*!40000 ALTER TABLE `convention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convention_reservedAttendances`
--

DROP TABLE IF EXISTS `convention_reservedAttendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `convention_reservedAttendances` (
  `reservedattendances_login_id` int(11) NOT NULL,
  `convention_id` int(11) NOT NULL,
  KEY `reservedattendances_login_id_index` (`reservedattendances_login_id`),
  KEY `convention_id_index` (`convention_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convention_reservedAttendances`
--

LOCK TABLES `convention_reservedAttendances` WRITE;
/*!40000 ALTER TABLE `convention_reservedAttendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `convention_reservedAttendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_card`
--

DROP TABLE IF EXISTS `credit_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_card` (
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `expr_date` date DEFAULT NULL,
  `cvv` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_card`
--

LOCK TABLES `credit_card` WRITE;
/*!40000 ALTER TABLE `credit_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hosting`
--

DROP TABLE IF EXISTS `hosting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hosting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host_login_id` int(11) DEFAULT NULL,
  `convention_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hosting`
--

LOCK TABLES `hosting` WRITE;
/*!40000 ALTER TABLE `hosting` DISABLE KEYS */;
INSERT INTO `hosting` VALUES (1,2,1),(2,3,2),(3,1,3),(4,3,4),(5,1,5),(6,2,6),(7,2,7),(8,3,8),(9,1,9),(10,8,10),(11,8,11),(12,8,12),(13,2,13),(14,1,14),(15,2,15),(16,2,16);
/*!40000 ALTER TABLE `hosting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('unquietableEidolonhelvum@gmail.com','123','Unquietable Eidolonhelvum',1),('trickishAlleycat@gmail.com','123','Trickish Alleycat',2),('chewyNightcrawler@gmail.com','123','Chewy Nightcrawler',3),('unsinfulSkink@gmail.com','123','Unsinful Skink',4),('microbiophobicShibainu@gmail.com','123','Microbiophobic Shibainu',5),('graciousThunderbird@gmail.com','123','Gracious Thunderbird',6),('carelessCarp@gmail.com','123','Careless Carp',7),('wqdwqd','fwfd','dwqdwqd',8),('wqdwq','wqdwq','dwqdw',9),('wqewqe','12e21e','wqewqe',10),('yty','erer','[[[',11),('qwer','qwer','qwer',12);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_admin`
--

DROP TABLE IF EXISTS `login_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_admin` (
  `login_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_admin`
--

LOCK TABLES `login_admin` WRITE;
/*!40000 ALTER TABLE `login_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_attendee`
--

DROP TABLE IF EXISTS `login_attendee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_attendee` (
  `login_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attendee`
--

LOCK TABLES `login_attendee` WRITE;
/*!40000 ALTER TABLE `login_attendee` DISABLE KEYS */;
INSERT INTO `login_attendee` VALUES (4),(5),(6),(7),(12);
/*!40000 ALTER TABLE `login_attendee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_host`
--

DROP TABLE IF EXISTS `login_host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login_host` (
  `login_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_host`
--

LOCK TABLES `login_host` WRITE;
/*!40000 ALTER TABLE `login_host` DISABLE KEYS */;
INSERT INTO `login_host` VALUES (1),(2),(3),(8),(9),(10),(11);
/*!40000 ALTER TABLE `login_host` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `convention_id` int(11) DEFAULT NULL,
  `attendee_login_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('Auditorium 1',1,1),('Concert Hall 1',2,2),('Lecture Hall 1',3,3),('Conference Room 1',4,4);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_type`
--

DROP TABLE IF EXISTS `room_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_type` (
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_type`
--

LOCK TABLES `room_type` WRITE;
/*!40000 ALTER TABLE `room_type` DISABLE KEYS */;
INSERT INTO `room_type` VALUES ('Auditorium','A room for play',1),('Concert Hall','A room for music',2),('Lecture Hall','A room for lecture',3),('Conference Room','A room for conference',4);
/*!40000 ALTER TABLE `room_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seat` (
  `row` int(11) DEFAULT NULL,
  `col` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `zone_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,1,1,1),(1,2,2,1),(1,3,3,1),(1,4,4,1),(1,5,5,1),(1,6,6,1),(2,1,7,1),(2,2,8,1),(2,3,9,1),(2,4,10,1),(2,5,11,1),(2,6,12,1),(1,1,13,2),(1,2,14,2),(1,3,15,2),(1,4,16,2),(1,5,17,2),(1,6,18,2),(2,1,19,2),(2,2,20,2),(2,3,21,2),(2,4,22,2),(2,5,23,2),(2,6,24,2),(1,1,25,3),(1,2,26,3),(1,3,27,3),(1,4,28,3),(1,5,29,3),(1,6,30,3),(2,1,31,3),(2,2,32,3),(2,3,33,3),(2,4,34,3),(2,5,35,3),(2,6,36,3),(2,7,37,3),(2,8,38,3),(3,1,39,3),(3,2,40,3),(3,3,41,3),(3,4,42,3),(3,5,43,3),(3,6,44,3),(3,7,45,3),(3,8,46,3),(3,9,47,3),(3,10,48,3),(4,1,49,3),(4,2,50,3),(4,3,51,3),(4,4,52,3),(4,5,53,3),(4,6,54,3),(4,7,55,3),(4,8,56,3),(1,1,57,4),(1,2,58,4),(1,3,59,4),(2,1,60,4),(2,2,61,4),(2,3,62,4),(1,1,63,5),(1,2,64,5),(1,3,65,5),(2,1,66,5),(2,2,67,5),(2,3,68,5),(1,1,69,6),(1,2,70,6),(1,3,71,6),(1,4,72,6),(1,5,73,6),(1,6,74,6),(1,7,75,6),(1,8,76,6),(2,1,77,6),(2,2,78,6),(2,3,79,6),(2,4,80,6),(2,5,81,6),(2,6,82,6),(2,7,83,6),(2,8,84,6),(1,1,85,7),(1,2,86,7),(1,3,87,7),(1,4,88,7),(1,5,89,7),(1,6,90,7),(1,7,91,7),(1,8,92,7),(2,1,93,7),(2,2,94,7),(2,3,95,7),(2,4,96,7),(2,5,97,7),(2,6,98,7),(2,7,99,7),(2,8,100,7),(1,1,101,8),(1,2,102,8),(1,3,103,8),(1,4,104,8),(1,5,105,8),(1,6,106,8),(1,7,107,8),(1,8,108,8),(1,9,109,8),(1,10,110,8),(2,1,111,8),(2,2,112,8),(2,3,113,8),(2,4,114,8),(2,5,115,8),(2,6,116,8),(2,7,117,8),(2,8,118,8),(2,9,119,8),(2,10,120,8),(3,1,121,8),(3,2,122,8),(3,3,123,8),(3,4,124,8),(3,5,125,8),(3,6,126,8),(3,7,127,8),(3,8,128,8),(3,9,129,8),(3,10,130,8),(1,1,131,9),(1,2,132,9),(1,3,133,9),(1,4,134,9),(1,5,135,9),(1,6,136,9),(2,1,137,9),(2,2,138,9),(2,3,139,9),(2,4,140,9),(2,5,141,9),(2,6,142,9),(3,1,143,9),(3,2,144,9),(3,3,145,9),(3,4,146,9),(3,5,147,9),(3,6,148,9),(4,1,149,9),(4,2,150,9),(4,3,151,9),(4,4,152,9),(4,5,153,9),(4,6,154,9),(5,1,155,9),(5,2,156,9),(5,3,157,9),(5,4,158,9),(5,5,159,9),(5,6,160,9),(6,1,161,9),(6,2,162,9),(6,3,163,9),(6,4,164,9),(6,5,165,9),(6,6,166,9),(1,1,167,10),(1,2,168,10),(1,3,169,10),(1,4,170,10),(1,5,171,10),(1,6,172,10),(1,7,173,10),(2,1,174,10),(2,2,175,10),(2,3,176,10),(2,4,177,10),(2,5,178,10),(2,6,179,10),(2,7,180,10),(2,8,181,10),(2,9,182,10),(3,1,183,10),(3,2,184,10),(3,3,185,10),(3,4,186,10),(3,5,187,10),(3,6,188,10),(3,7,189,10),(3,8,190,10),(3,9,191,10),(3,10,192,10),(4,1,193,10),(4,2,194,10),(4,3,195,10),(4,4,196,10),(4,5,197,10),(4,6,198,10),(4,7,199,10),(4,8,200,10),(4,9,201,10),(4,10,202,10),(4,11,203,10),(5,1,204,10),(5,2,205,10),(5,3,206,10),(5,4,207,10),(5,5,208,10),(5,6,209,10),(5,7,210,10),(5,8,211,10),(5,9,212,10),(5,10,213,10),(5,11,214,10),(5,12,215,10),(5,13,216,10),(6,1,217,10),(6,2,218,10),(6,3,219,10),(6,4,220,10),(6,5,221,10),(6,6,222,10),(6,7,223,10),(6,8,224,10),(6,9,225,10),(6,10,226,10),(6,11,227,10),(6,12,228,10),(6,13,229,10),(6,14,230,10),(6,15,231,10),(1,1,232,11),(1,2,233,11),(1,1,234,12),(2,1,235,12),(3,1,236,12),(4,1,237,12),(1,1,238,13),(1,2,239,13),(1,1,240,14),(2,1,241,14),(3,1,242,14),(4,1,243,14);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone`
--

DROP TABLE IF EXISTS `zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zone` (
  `price` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES (200,1,1),(200,2,1),(300,3,1),(200,4,2),(200,5,2),(300,6,2),(300,7,2),(400,8,2),(500,9,2),(100,10,3),(50,11,4),(50,12,4),(50,13,4),(50,14,4);
/*!40000 ALTER TABLE `zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-14 20:56:04
