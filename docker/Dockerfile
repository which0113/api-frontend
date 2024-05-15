FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# 构建：docker build -t freefish-api-frontend:v0.0.1 .
# 运行：docker run -p 80:80 -p 443:443 -d freefish-api-frontend:v0.0.1
