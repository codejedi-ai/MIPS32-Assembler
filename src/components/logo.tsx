import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
  className?: string
}

export function Logo({ size = "medium", showText = true, className = "" }: LogoProps) {
  const sizes = {
    small: { width: 32, height: 32, fontSize: "0.875rem" },
    medium: { width: 40, height: 40, fontSize: "1.25rem" },
    large: { width: 120, height: 120, fontSize: "3rem" },
  }

  const { width, height, fontSize } = sizes[size]

  return (
    <Link to="/" style={{ textDecoration: 'none' }} className={className}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width,
            height,
            background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: fontSize,
            }}
          >
            SD
          </Typography>
        </Box>
        {showText && (
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              fontSize: size === "large" ? "2rem" : size === "small" ? "1.125rem" : "1.25rem",
            }}
          >
            Secundus<Box component="span" sx={{ color: 'primary.main' }}> Dermis</Box>
          </Typography>
        )}
      </Box>
    </Link>
  )
}