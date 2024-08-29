FROM debian:bookworm
EXPOSE 8000
COPY . . 
RUN apt update && apt-get update
RUN apt install vim python3 python3-pip git pkgconf unzip curl  -y
RUN chmod +x adam_engine/radare.sh 
RUN ./adam_engine/radare.sh
RUN pip install -r adam_engine/requirements.txt --break-system-packages
RUN r2pm -ci r2ghidra r2ghidra-sleigh
CMD ["uvicorn","main:app","--host","0.0.0.0","--reload"]



