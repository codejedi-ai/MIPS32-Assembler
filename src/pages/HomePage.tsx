"use client"

import { Shield, Sparkles, Layers, Droplets, Wind, Star } from "lucide-react"
import { Box, Container, Typography, Button, Grid, Card, CardContent } from "@mui/material"
import { Navbar } from "@/components/navbar"
import { FeatureCard } from "@/components/feature-card"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%)' }}>
      <Navbar />

      <Box component="main">
        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            pt: 8,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(37, 99, 235, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
            }}
          />
          
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '3rem', md: '4.5rem' },
                        fontWeight: 'bold',
                        mb: 3,
                        background: 'linear-gradient(to right, #2563eb, #9333ea)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1.1,
                      }}
                    >
                      Your Revolutionary{' '}
                      <Box component="span" sx={{ color: 'text.primary' }}>
                        Second Skin
                      </Box>
                    </Typography>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'text.secondary',
                        mb: 5,
                        lineHeight: 1.6,
                        fontWeight: 400,
                      }}
                    >
                      The Secundus Dermis is a revolutionary all-in-one base layer that integrates practicality, resilience, and elegance. Experience the future of intelligent clothing.
                    </Typography>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': { backgroundColor: 'primary.dark' },
                          fontSize: '1.125rem',
                          px: 4,
                          py: 2,
                          borderRadius: '50px',
                          boxShadow: 3,
                          '&:hover': {
                            boxShadow: 6,
                          },
                        }}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.50',
                            borderColor: 'primary.main',
                          },
                          fontSize: '1.125rem',
                          px: 4,
                          py: 2,
                          borderRadius: '50px',
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: 600,
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 6,
                      }}
                    >
                      <img
                        src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg"
                        alt="Secundus Dermis - Revolutionary Base Layer"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(30, 58, 138, 0.2) 0%, transparent 50%, transparent 100%)',
                        }}
                      />
                    </Box>
                    
                    {/* Floating feature badges */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -16,
                          left: -16,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          p: 2,
                          boxShadow: 3,
                        }}
                      >
                        <Shield size={32} color="#2563eb" />
                      </Box>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -16,
                          right: -16,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          p: 2,
                          boxShadow: 3,
                        }}
                      >
                        <Sparkles size={32} color="#9333ea" />
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Core Functions Section */}
        <Box id="technology" component="section" sx={{ py: 12, backgroundColor: 'white' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  Core <Box component="span" sx={{ color: 'primary.main' }}>Functions</Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 600,
                    mx: 'auto',
                    fontWeight: 400,
                  }}
                >
                  Discover how the Secundus Dermis revolutionizes your wardrobe with its multi-functional design
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Layers size={48} />}
                  title="Multi-Functional Design"
                  description="Acts as a bra, layering tee, and emergency undergarment all in one elegant piece. No compromises on style or functionality."
                  delay={0.1}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Wind size={48} />}
                  title="Ultimate Adaptability"
                  description="Perfect for casual, professional, or ceremonial attire. Concealable yet stylish enough to showcase openly."
                  delay={0.2}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FeatureCard
                  icon={<Shield size={48} />}
                  title="Hygienic Durability"
                  description="Silver-infused threads provide antimicrobial properties, eliminating odor even after extended wear."
                  delay={0.3}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Materials Section */}
        <Box
          id="materials"
          component="section"
          sx={{
            py: 12,
            background: 'linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      fontWeight: 'bold',
                      mb: 4,
                      color: 'text.primary',
                    }}
                  >
                    Premium <Box component="span" sx={{ color: 'primary.main' }}>Materials</Box>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.50',
                          p: 1.5,
                          borderRadius: '50%',
                        }}
                      >
                        <Sparkles size={24} color="#2563eb" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                          Silver-Infused Silk
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Antibacterial properties with luxurious, breathable texture for ultimate comfort.
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'secondary.50',
                          p: 1.5,
                          borderRadius: '50%',
                        }}
                      >
                        <Droplets size={24} color="#9333ea" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                          Egyptian Cotton
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          High-thread count for durability, moisture-wicking, and soft-touch finish.
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'success.50',
                          p: 1.5,
                          borderRadius: '50%',
                        }}
                      >
                        <Wind size={24} color="#059669" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                          Elastic Fiber Blends
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Form-fitting flexibility that moves with your body without restriction.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 500,
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: 4,
                    }}
                  >
                    <img
                      src="https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg"
                      alt="Premium Materials"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 50%, transparent 100%)',
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonial Section */}
        <Box id="testimonials" component="section" sx={{ py: 12, backgroundColor: 'white' }}>
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={32} color="#fbbf24" fill="#fbbf24" />
                  ))}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.4,
                  }}
                >
                  "The Secundus Dermis isn't just clothing—it's a declaration of ingenuity and independence. 
                  After 3 weeks of continuous wear, it still feels fresh and looks elegant."
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
                    alt="Mekkana"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Mekkana
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Innovation Enthusiast
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* About Section */}
        <Box
          id="about"
          component="section"
          sx={{
            py: 12,
            background: 'linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)',
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  The Future of <Box component="span" sx={{ color: 'primary.main' }}>Intelligent Clothing</Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 800,
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  The Secundus Dermis represents more than just an advancement in textile technology—it's a paradigm shift 
                  toward clothing that truly understands and adapts to human needs. Our revolutionary approach combines 
                  cutting-edge materials science with elegant design to create a garment that empowers you to live without compromise.
                </Typography>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          component="section"
          sx={{
            py: 12,
            background: 'linear-gradient(to right, #2563eb, #9333ea)',
          }}
        >
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    mb: 4,
                    color: 'white',
                  }}
                >
                  Ready to Experience Your <Box component="span" sx={{ color: 'rgba(147, 197, 253, 1)' }}>Second Skin</Box>?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(147, 197, 253, 1)',
                    mb: 5,
                    maxWidth: 600,
                    mx: 'auto',
                    fontWeight: 400,
                  }}
                >
                  Join the revolution in intelligent clothing. Experience the perfect blend of luxury, technology, and functionality.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 246, 255, 1)',
                    },
                    fontSize: '1.25rem',
                    py: 2,
                    px: 5,
                    borderRadius: '50px',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  Order Your Secundus Dermis
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}