FROM python:3.9
WORKDIR /
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
COPY ./main.py /worker1.py
CMD ["uvicorn", "worker1:app", "--host", "0.0.0.0", "--port", "8000"]