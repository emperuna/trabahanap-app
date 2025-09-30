import { Box, Text, VStack, HStack, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AlbertoImg from "../../../assets/images/Alberto.png";
import TwitterLogo from "../../../assets/icons/Twitter.svg";
import FacebookLogo from "../../../assets/icons/Facebook.svg";
import GithubLogo from "../../../assets/icons/Github.svg";
import LinkedinLogo from "../../../assets/icons/Linkedin.svg";
import TrabaHanapLogo from "../../../assets/logo/TrabaHanap-Logo.svg";

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

function SocialIcons({ isBrightBlue }) {
	return (
		<HStack spacing={3}>
			<Image src={FacebookLogo} alt="Facebook" boxSize={5} filter={isBrightBlue ? "brightness(0) invert(1)" : ""} />
			<Image src={TwitterLogo} alt="Twitter" boxSize={5} filter={isBrightBlue ? "brightness(0) invert(1)" : ""} />
			<Image src={GithubLogo} alt="Github" boxSize={5} filter={isBrightBlue ? "brightness(0) invert(1)" : ""} />
			<Image src={LinkedinLogo} alt="Linkedin" boxSize={5} filter={isBrightBlue ? "brightness(0) invert(1)" : ""} />
		</HStack>
	);
}

function Team() {
	return (
		<Box py={16} px={8} bg="white">
			<Box mb={8}>
				<Text
					fontSize={{ base: "3xl", md: "5xl" }}
					fontWeight="extrabold"
					color="blue.600"
					textAlign="center"
				>
					Meet the team
				</Text>
			</Box>
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
								{/* TrabaHanap logo on the left */}
								<Image
									src={TrabaHanapLogo}
									alt="TrabaHanap Logo"
									boxSize={7}
									filter={isBrightBlue ? "brightness(0) invert(1)" : ""}
								/>
								{/* Social icons on the right */}
								<SocialIcons isBrightBlue={isBrightBlue} />
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
