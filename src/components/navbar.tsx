"use client"

import { useState, useEffect } from "react"
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material"
import { Menu, Close } from "@mui/icons-material"
import { Logo } from "@/components/logo"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Technology", href: "#technology" },
    { label: "Materials", href: "#materials" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
  ]

  return (
    <AppBar
      position="fixed"
      elevation={isScrolled ? 1 : 0}
      sx={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        borderBottom: isScrolled ? '1px solid rgba(229, 231, 235, 1)' : 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        <Logo />

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button
            sx={{
              color: 'text.primary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Order Now
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: 'block', md: 'none' }, color: 'text.primary' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <Close /> : <Menu />}
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} component="a" href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem>
              <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
                Contact
              </Button>
            </ListItem>
            <ListItem>
              <Button fullWidth variant="contained">
                Order Now
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}