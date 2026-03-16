var jwt = require("jsonwebtoken");
private_key='-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIMN6kbeP011DGZ/N0mbEToX2vFSlw4cf+yK8DTO7VGOSoAoGCCqGSM49\nAwEHoUQDQgAEQMQcwI7nmmWmBRdrm+9geMDk9AFh0yiXINhDYl9Zhy4GbGLeinMa\niDLY6aQZLlQxk5vSG0WVB6NvA3mQAAGW0w==\n-----END EC PRIVATE KEY-----\n';
claims = {
    'name': 'Jane Doe',
    'given_name': 'Jane',
    'family_name': 'Doe',
    'email': 'jane.doe@example.com',
    'sub': 'jane.doe',
    'exp': Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5,
    'iat': Math.floor(Date.now() / 1000)
}
token=jwt.sign(claims, private_key, {algorithm: "ES256"});
console.log(token)