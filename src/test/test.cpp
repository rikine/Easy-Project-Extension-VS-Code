#include <test.h>
#include <iostream>

test::test(int a) : a(a)
{
}

test::~test()
{
    std::cout << "DESTROY A" << std::endl;
}
