FROM node:lts-alpine
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
COPY ./ /usr/src/app/
WORKDIR /usr/src/app/
RUN apk add --no-cache git
RUN yarn install && \
  yarn cache clean
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
CMD [ \"yarn\", \"server\" ]