# Copyright (C) 2022 Assistance.Chat contributors

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import logging

import aiohttp
import uvicorn
from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordRequestForm

from . import ctx
from .conversations import run_chat_response, run_chat_start
from .keys import set_openai_api_key
from .login import (
    Token,
    User,
    create_temp_account,
    get_current_user,
    get_user_access_token,
)
from .mailgun import send_access_link

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)d %(levelname)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


app = FastAPI()


@app.on_event("startup")
async def startup_event():
    set_openai_api_key()
    ctx.session = aiohttp.ClientSession()


@app.on_event("shutdown")
async def shutdown_event():
    await ctx.session.close()


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    access_token = get_user_access_token(form_data.username, form_data.password)

    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/temp-account")
async def temp_account():
    username = create_temp_account()

    return {"username": username}


@app.post("/chat/start")
async def chat_start(
    client_name: str,
    agent_name: str,
    prompt: str,
    current_user: User = Depends(get_current_user),
):
    response = run_chat_start(
        username=current_user.username,
        client_name=client_name,
        agent_name=agent_name,
        prompt=prompt,
    )

    return {"response": response}


@app.post("/chat/continue")
async def chat_continue(
    client_name: str,
    agent_name: str,
    client_text: str | None = None,
    current_user: User = Depends(get_current_user),
):
    response = run_chat_response(
        username=current_user.username,
        client_name=client_name,
        agent_name=agent_name,
        client_text=client_text,
    )

    return {"response": response}


@app.post("/send/signin-link")
async def send_user_signin_link(email: str):
    await send_access_link(email=email)


def main():
    uvicorn.run("assistance.api.main:app", port=8080, log_level="info", reload=True)


if __name__ == "__main__":
    main()