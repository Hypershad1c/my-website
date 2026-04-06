const fs = require('fs')
const hash = '$2b$10$OjtfDlSyoE.CKvG3SskzHOHUmTHi1U0okIYHxiX0qCnaA1Y82K036'
const content = `AUTH_SECRET="your-existing-secret"
ADMIN_EMAIL="spox618@gmail.com"
ADMIN_PASSWORD_HASH="${hash}"
DATABASE_URL="mongodb+srv://Vercel-Admin-atlas-aquamarine-candle:0fVHhcMOjRJVC0DR@atlas-aquamarine-candle.qqamcbr.mongodb.net/ecommerce?retryWrites=true&w=majority"
`
fs.writeFileSync('.env.local', content)
console.log('Done!')