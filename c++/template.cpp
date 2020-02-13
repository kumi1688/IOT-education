#include <iostream>
using namespace std;

template <typename T>
T Add(T a, T b){
    return a + b;
}

namespace TEST{
    int g_nData = 100;
    
    void TestFunc(void){
        std::cout << "TEST::testfunct()" << std::endl;
    }
}

int main(){
    cout << Add(3, 4) << endl;
    cout << Add(3.4, 4.5) << endl;
    
    TEST::TestFunc();
    std::cout << TEST::g_nData << endl;

    return 0;

}