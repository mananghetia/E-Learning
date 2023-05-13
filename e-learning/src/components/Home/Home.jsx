import React from 'react'
import { Button, Text, Heading, Stack, VStack, Image, Box, HStack } from '@chakra-ui/react'
import "./home.css"
import vg from "../../assets/images/bg.png"
import introVideo from "../../assets/videos/intro.mp4"
import { Link } from 'react-router-dom'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'

const Home = () => {
    return (
        <section className='home'>
            <div className="container">
                <Stack direction={['column', 'row']} height="100%" justifyContent={['center', 'space-between']} alignItems="center" spacing={['16', '56']}>
                    <VStack width={"full"} alignItems={['center', 'flex-end']} spacing="8">
                        <Heading children="LEARN FROM THE EXPERT" size={'2xl'} />
                        <Text fontSize={'2xl'} fontFamily={'cursive'} textAlign={['center', 'left']} children="Find Valuable Content at Resonable Price" />
                        <Link to={"/courses"}>
                            <Button size={"lg"} colorScheme={"yellow"}>Explore Now</Button>
                        </Link>
                    </VStack>
                    <Image className='vector-graphics' boxSize={'md'} src={vg} objectFit="contain" />
                </Stack>
            </div>
            <Box padding={"8"} bg={"blackAlpha.800"}>
                <Heading textAlign={'center'} color={'yellow.400'} children="OUR BRANDS" />
                <HStack className='brandsBanner' justifyContent={'space-evenly'}
                    marginTop={"4"}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>

            <div className="container2">
                <video autoPlay controls src={introVideo} controlsList="nodownload nofullscreen noremoteplayback" muted disablePictureInPicture disableRemotePlayback />
            </div>
        </section>
    )
}

export default Home