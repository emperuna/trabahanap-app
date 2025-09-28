import { Box, Text, VStack, HStack, Icon, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AlbertoImg from "../../../assets/images/Alberto.png";
import TrabaHanapLogo from "../../../assets/logo/TrabaHanap-Logo.svg";
import TrabaHanapLogoWhite from "../../../assets/logo/TrabaHanap-Logo-White.svg";

const teamMembers = [
	{
		name: "Jeremy Garin",
		role: "UI/UX Designer",
		image: AlbertoImg,
		bg: "linear-gradient(135deg, #174AFF 0%, #3B82F6 100%)",
	},
	{
		name: "Jose Aquino III",
		role: "Developer",
		image: AlbertoImg,
		bg: "linear-gradient(135deg, #E0ECFF 0%, #B6D0F7 100%)",
	},
	{
		name: "Ian Patrick Mesias",
		role: "UI/UX Designer",
		image: AlbertoImg,
		bg: "linear-gradient(135deg, #E0ECFF 0%, #B6D0F7 100%)",
	},
	{
		name: "Marc Alberto",
		role: "UI/UX Designer",
		image: AlbertoImg,
		bg: "linear-gradient(135deg, #E0ECFF 0%, #B6D0F7 100%)",
	},
];

function SocialIcons() {
	return (
		<HStack spacing={3}>
			<Icon viewBox="0 0 20 20" boxSize={5} color="white">
				<circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
				<text x="6" y="15" fontSize="10" fill="currentColor">f</text>
			</Icon>
			<Icon viewBox="0 0 20 20" boxSize={5} color="white">
				<circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
				<text x="6" y="15" fontSize="10" fill="currentColor">O</text>
			</Icon>
			<Icon viewBox="0 0 20 20" boxSize={5} color="white">
				<circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
				<text x="6" y="15" fontSize="10" fill="currentColor">X</text>
			</Icon>
			<Icon viewBox="0 0 20 20" boxSize={5} color="white">
				<circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
				<text x="6" y="15" fontSize="10" fill="currentColor">in</text>
			</Icon>
		</HStack>
	);
}

function Team() {
	return (
		<Box py={16} px={8} bg="white">
			<HStack spacing={8} justify="center" align="stretch">
				{teamMembers.map((member, idx) => {
					const isBrightBlue = member.bg.includes("#174AFF");
					const fontColor = isBrightBlue ? "white" : "#174AFF";
					return (
						<motion.div
							key={member.name}
							initial={{
								background: member.bg,
								scale: 1,
							}}
							whileHover={{
								scale: 1.06,
							}}
							transition={{
								scale: { duration: 0.2 },
							}}
							style={{
								width: 260,
								height: 360,
								borderRadius: "1rem",
								boxShadow: "0 2px 8px rgba(23,74,255,0.08)",
								overflow: "hidden",
								display: "flex",
								flexDirection: "column",
								position: "relative",
								cursor: "pointer",
								background: member.bg,
							}}
						>
							<Flex px={6} pt={5} justify="space-between" align="center">
								<Image
									src={isBrightBlue ? TrabaHanapLogoWhite : TrabaHanapLogo}
									alt="TrabaHanap Logo"
									boxSize={7}
								/>
								<SocialIcons />
							</Flex>
							<VStack align="start" spacing={1} px={6} pt={4} pb={2}>
								<Text fontSize="lg" fontWeight="bold" color={fontColor}>
									{member.name}
								</Text>
								<Text fontSize="sm" color={fontColor}>
									{member.role}
								</Text>
							</VStack>
							<Box
								flex={1}
								display="flex"
								alignItems="flex-end"
								justifyContent="center"
								mt={2}
								mb={0}
								px={0}
								position="relative"
								zIndex={2}
								minH="160px"
							>
								<Image
									src={member.image}
									alt={member.name}
									w="100%"
									h="auto"
									objectFit="contain"
									position="absolute"
									bottom="0"
									left="50%"
									transform="translateX(-50%)"
									bg="transparent"
								/>
							</Box>
						</motion.div>
					);
				})}
			</HStack>
		</Box>
	);
}

export default Team;
