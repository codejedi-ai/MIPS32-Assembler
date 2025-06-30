import { Link } from "react-router-dom"
import { Box, Container, Grid, Typography, IconButton } from "@mui/material"
import { Email, Phone, LocationOn } from "@mui/icons-material"

export function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'grey.200' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                Secundus Dermis
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Revolutionary all-in-one base layer that redefines what an underlayer can achieve.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <Email />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <Phone />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  <LocationOn />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary', mb: 2 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/technology" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Technology
                </Typography>
              </Link>
              <Link to="/materials" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Materials
                </Typography>
              </Link>
              <Link to="/testimonials" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Testimonials
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary', mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  About
                </Typography>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Contact
                </Typography>
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Careers
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary', mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Size Guide
                </Typography>
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Care Instructions
                </Typography>
              </Link>
              <Link to="#" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  Returns
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid', borderColor: 'grey.200', mt: 6, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2024 Secundus Dermis. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}