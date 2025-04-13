# This function calculates the maximum profit from a list of stock prices.
def solution(prices: list) -> int:
    min_price = float('inf')  # Initialize min price to a very high value
    max_profit = 0  # Initialize max profit to 0

    for price in prices:
        min_price = min(min_price, price)  # Update min price if a lower price is found
        max_profit = max(max_profit, price - min_price)  # Calculate max profit
        
    return max_profit


# This function finds the duplicate number in a list of integers.

from typing import List
def solution(nums: List[int]) -> int:
    # Step 1: Use Floyd's Cycle Detection Algorithm
    slow, fast = nums[0], nums[0]

    # Phase 1: Detect cycle
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break  # Cycle detected

    # Phase 2: Find the start of the cycle (duplicate number)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow  # The duplicate number