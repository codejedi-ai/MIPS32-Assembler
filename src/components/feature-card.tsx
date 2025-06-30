import React from "react"
import { Card, CardContent, Typography, Box } from "@mui/material"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(229, 231, 235, 1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: 3,
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
              color: 'primary.main',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}