FROM python:3.8
WORKDIR /
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt
COPY ./main.py /worker3.py
CMD ["uvicorn", "worker3:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]