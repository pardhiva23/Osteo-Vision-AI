# from app.auth.jwt_handler import *

# token = create_access_token(
#     {
#         "sub": "pardhiva"
#     }
# )

# print()

# print(token)

# print()

# payload = verify_access_token(token)

# print(payload)

import secrets

print(secrets.token_hex(32))