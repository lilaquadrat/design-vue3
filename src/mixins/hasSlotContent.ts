// slotUtils.ts
import type { Slot, VNode } from 'vue';
import { Comment } from 'vue';

/**
 * Checks whether the provided slot function returns any meaningful content.
 *
 * @param slot - The slot function to check.
 * @returns True if the slot has meaningful content, false otherwise.
 */
export function hasSlotContent (slot: Slot | undefined): boolean {
  // If the slot function does not exist, consider the slot empty.
  if (!slot) return false;

  // Call the slot function to retrieve an array of VNodes.
  const nodes: VNode[] = slot();

  if (!nodes || nodes.length === 0) return false;

  // Check if any of the VNodes contain meaningful content.
  return nodes.some((node: VNode) => {
    // Ignore comment nodes.
    if (node.type === Comment) return false;
    
    // If the node's children is a string, ignore it if it’s only whitespace.
    if (typeof node.children === 'string' && node.children.trim() === '') {
      return false;
    }

    return true;
  });
}
