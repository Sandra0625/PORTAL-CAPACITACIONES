$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    nombre = "Test User"
    email = "test@example.com"
    contrasena = "Password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:4000/api/usuarios/registro" `
    -Method POST `
    -Headers $headers `
    -Body $body `
    -ErrorAction Stop

Write-Host "Status Code: $($response.StatusCode)"
Write-Host "Response: $($response.Content)"
