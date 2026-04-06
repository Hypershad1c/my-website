export default function AuthErrorPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", 
      fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <h1 style={{ fontSize: "14px", letterSpacing: "0.1em", marginBottom: "16px" }}>AUTH ERROR</h1>
        <a href="/admin/login" style={{ color: "#888", fontSize: "12px" }}>← back to login</a>
      </div>
    </div>
  )
}