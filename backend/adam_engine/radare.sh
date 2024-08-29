git clone https://github.com/radareorg/radare2
cd radare2

make purge
rm -rf shlr/capstone
git clean -xdf
git reset --hard @~50
sys/install.sh
cd ..
