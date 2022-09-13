echo "[1]Removing files..."
rm -r /run/user/1000/gvfs/ftp:host=korgut.fr/*;
echo "[2]Coping files..."
cp -r ./build/* /run/user/1000/gvfs/ftp:host=korgut.fr;
echo "[3]Coping hidden files..."
cp ./build/.* /run/user/1000/gvfs/ftp:host=korgut.fr;
