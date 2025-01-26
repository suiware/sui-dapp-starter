// Copyright (c) Konstantin Komelin and other contributors
// SPDX-License-Identifier: MIT

#[test_only]
module counter::counter_tests;

use counter::counter;
use sui::test_scenario as ts;
use sui::test_utils;

#[test]
/// Tests increment and decrement of the counter.
fun test_counter() {
    let user1 = @0x1;
    let user2 = @0x2;

    let mut ts = ts::begin(user1);

    let mut c = counter::new_for_testing(ts.ctx());

    assert!(counter::value(&c) == 0, 0);

    ts.next_tx(user1);
    counter::increment(&mut c);
    assert!(counter::value(&c) == 1, 1);

    ts.next_tx(user2);
    counter::increment(&mut c);
    assert!(counter::value(&c) == 2, 2);

    ts.next_tx(user1);
    counter::decrement(&mut c);
    assert!(counter::value(&c) == 1, 3);

    ts.next_tx(user2);
    counter::decrement(&mut c);
    assert!(counter::value(&c) == 0, 4);

    test_utils::destroy(c);
    ts.end();
}
