FROM 573377737753.dkr.ecr.us-east-1.amazonaws.com/intract/nginx:latest

#Pull latest version
COPY --chown=www-data:www-data ./build/ /var/www/html

#RUN find /var/www/html -type f -exec chmod 644 {} \;
#RUN find /var/www/html -type d -exec chmod 755 {} \;

WORKDIR /var/www/html
RUN ln -s /var/www/storage/app /var/www/html/assets

EXPOSE 80