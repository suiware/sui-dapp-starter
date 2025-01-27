// Copyright (c) Konstantin Komelin and other contributors
// SPDX-License-Identifier: MIT

/// Module: counter
module counter::counter;

// === Imports ===

// === Constants ===

// === Errors ===

// === Structs ===

public struct Counter has key {
    id: UID,
    owner: address,
    value: u64,
}

// === Events ===

// === Initializer ===

/// Create and share a Counter object.
public fun create(ctx: &mut TxContext) {
    // Create the Counter object.
    let counter = new(ctx);

    // Share the Counter object with everyone.
    transfer::share_object(counter);
}

// === Public-Mutative Functions ===

public fun increment(counter: &mut Counter) {
    counter.value = counter.value + 1;
}

public fun decrement(counter: &mut Counter) {
    counter.value = counter.value - 1;
}

// === Public-View Functions ===

/// Returns current value for the counter.
public fun value(g: &Counter): u64 {
    g.value
}

// === Private Functions ===

/// Create a new Counter object.
fun new(ctx: &mut TxContext): Counter {
    Counter {
        id: object::new(ctx),
        owner: ctx.sender(),
        value: 0,
    }
}

// === Test Functions ===

#[test_only]
/// Create a new Counter for tests.
public fun new_for_testing(ctx: &mut TxContext): Counter {
    let counter = new(ctx);
    counter
}
