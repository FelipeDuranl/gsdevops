FROM python:latest
RUN pip install --upgrade pip
RUN pip install flask
RUN pip install Flask-RESTful
RUN pip install flask-cors
RUN pip install mysql-connector
COPY app.py /app.py
CMD ["python","app.py"]