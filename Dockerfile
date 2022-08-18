FROM alpine:3.15
RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
WORKDIR /app
COPY . .