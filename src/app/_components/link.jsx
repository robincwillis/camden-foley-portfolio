
import NextLink from 'next/link';
import { Link as NextViewTransitionLink } from 'next-view-transitions'
import useViewTransitionSupport from "@/app/_hooks/use-view-transition-support"

export default function LinkComponent({ children, ...props }) {
    const viewTransitionsSupported = useViewTransitionSupport()

    if (viewTransitionsSupported) {
        return (
            <NextViewTransitionLink {...props}>
                {children}
            </NextViewTransitionLink>
        )
    } else {
        return (
            <NextLink {...props}>
                {children}
            </NextLink>
        )
    }
}