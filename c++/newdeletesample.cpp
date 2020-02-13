#include <iostream>
using namespace std;

int main(){
    int *pData = new int;
    int *pNewData = new int(10);
    int *arr = new int[5];
    
    for(int i = 0; i < 5; i++){
        arr[i] = ( i + 1 ) * 10;
    }

    for(int i = 0; i < 5; i++){
        cout << arr[i] << endl;
    }

    *pData = 5;
    std::cout << *pData << std::endl;
    std::cout << *pNewData << std::endl;
    std::cout << pData << std::endl;
    std::cout << pNewData << std::endl;

    std::cout << sizeof(pNewData) << std::endl;
    
    delete pData;
    delete pNewData;
    delete[] arr;
}