# Ficheros y carpetas relevantes

En el repositorio de GitHub del proyecto hay una serie de ficheros y carpetas necesarios para una
correcta ejecución de la práctica:
 - dumps/ : Carpeta que contiene los ficheros films.json y films_formatted.json. En el caso del
volcado de datos a ElasticSearch será necesario usar el fichero formateado. El fichero
films.json solamente es una muestra del resultado del crawling sin su correspondiente filtrado y
preparado.
 - scrapyfimls.postman_collection.json: Colección de las peticiones HTTP para Postman
utilizadas en el proyecto.
 - elasticsearch.yml: Archivo de configuración de ElasticSearch para el correcto funcionamiento
con la web.

# Ejecución del proyecto
Para la ejecución, se supone que se el equipo a emplear tiene ElasticSearch instalado y configurado
como se ha explicado en la memoria y en ejecución en el puerto 9200.

1. Clonado del proyecto: git clone https://github.com/joaquinsolla/scrapyfilms
2. Nos colocamos en la carpeta raíz del proyecto: cd scrapyfilms
3. Ejecución del spider: scrapy crawl no-scraper -o dumps/films.json
4. Nos colocamos en la carpeta del crawler: cd scrapyfilms
5. Ejecutamos el formateador para Postman: python postman_formatter.py
6. Ejecución de las peticiones 01 a 07 (incluidas) en Postman.
7. Nos colocamos en la carpeta del proyecto web: cd ../scrapyfilms-web
8. Ejecutamos la aplicación web: npm start
   
Seguidos estos pasos, la aplicación será accesible en cualquier navegador en la dirección
http://localhost:3000/.

*La ejecución del spider puede ser muy larga (de más de una hora), por lo que se proporcionan ya los
archivos films.json y films_formatted.json en la carpeta dumps del proyecto. De esta forma podemos
pasar directamente del paso 2 al 6.
