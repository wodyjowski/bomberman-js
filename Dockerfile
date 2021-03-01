from nginx
copy . /usr/share/nginx/html
copy default.conf /etc/nginx/conf.d/

RUN echo $PORT
cmd sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
