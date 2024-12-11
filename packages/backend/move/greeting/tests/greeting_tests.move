// Copyright (c) Konstantin Komelin and other contributors
// SPDX-License-Identifier: MIT

#[test_only]
module greeting::greeting_tests;

use greeting::greeting;
use sui::random::{Self, Random};
use sui::test_scenario as ts;
use sui::test_utils;

#[test]
/// Tests successful run of the set_greeting() and reset_greeting() functions.
fun test_greeting() {
    let user1 = @0x0;
    let bob = b"Bob".to_string();
    let alice = b"Alice".to_string();
    let empty = b"".to_string();
    let mut ts = ts::begin(user1);

    // Run the module initializer.
    // The curly braces are used to explicitly scope the transaction.
    {
        greeting::init_for_testing(ts.ctx());
    };

    // @todo: Test Object Display.

    // Setup randomness.
    random::create_for_testing(ts.ctx());
    ts.next_tx(user1);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
        ts.ctx(),
    );

    ts.next_tx(user1);
    let mut g = greeting::new_for_testing(bob, ts.ctx());
    assert!(greeting::name(&g) == bob, 0);
    assert!(greeting::emoji(&g) == greeting::no_emoji_index(), 1);

    ts.next_tx(user1);
    greeting::set_greeting(&mut g, alice, &random_state, ts.ctx());
    assert!(greeting::name(&g) == alice, 2);
    assert!(
        greeting::emoji(&g) >= greeting::min_emoji_index() && greeting::emoji(&g) <= greeting::max_emoji_index(),
        3,
    );

    ts.next_tx(user1);
    greeting::reset_greeting(&mut g);
    assert!(greeting::name(&g) == empty, 4);
    assert!(greeting::emoji(&g) == greeting::no_emoji_index(), 5);

    test_utils::destroy(g);
    ts::return_shared(random_state);
    ts.end();
}

#[test]
#[expected_failure(abort_code = greeting::EEmptyName)]
/// Tests failed run of the set_greeting() in case of the empty name.
fun test_set_greeting_fail() {
    let user1 = @0x0;
    let bob = b"Bob".to_string();
    let empty = b"".to_string();
    let mut ts = ts::begin(user1);

    // Run the module initializer.
    // The curly braces are used to explicitly scope the transaction.
    {
        greeting::init_for_testing(ts.ctx());
    };

    // Setup randomness.
    random::create_for_testing(ts.ctx());
    ts.next_tx(user1);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
        ts.ctx(),
    );

    ts.next_tx(user1);
    let mut g = greeting::new_for_testing(bob, ts.ctx());
    assert!(greeting::name(&g) == bob, 0);
    assert!(greeting::emoji(&g) == greeting::no_emoji_index(), 1);

    ts.next_tx(user1);
    // Should fail.
    greeting::set_greeting(&mut g, empty, &random_state, ts.ctx());

    test_utils::destroy(g);
    ts::return_shared(random_state);
    ts.end();
}
