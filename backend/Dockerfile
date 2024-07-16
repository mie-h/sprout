FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install -U pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/backend ./src/backend
# COPY migrations /app/migrations
# COPY flyway.user.toml flyway.toml /app/
# COPY tests /app/tests

EXPOSE 8000
CMD ["uvicorn", "src.backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
