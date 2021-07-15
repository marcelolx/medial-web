# build environment
FROM node:10.15.3
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN yarn install --ignore-engines
RUN yarn global add react-scripts@4.0.3 --ignore-engines
COPY . /usr/src/app
RUN yarn build
ENV PORT 8443
EXPOSE 8443
CMD ["node", "./server/"]


# production environment
#FROM nginx:1.13.9-alpine
#RUN rm -rf /etc/nginx/conf.d
#COPY conf /etc/nginx
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
