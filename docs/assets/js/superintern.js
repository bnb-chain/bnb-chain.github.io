(function() {
    'use strict';

    // ==================== Configuration ====================
    var CONFIG = {
        apiKey: 'sk_live_vEFiRm_CGXO3AUsmOjcu1H7lEnk32J1zvrQhcY8M',
        agentId: '243f7652-5185-4d9f-974b-b5b0d1ce29d2',
        modeShortId: 'web-qa-bnb',
        primaryBrandColor: '#f0b90b',
        botAvatar: 'https://static.bnbchain.org/home-ui/static/images/logo.svg',
        botName: 'Ask BNB Chain AI',
        introMessage: 'How do I get started?',
        quickQuestions: [
            'How do I get BNB?',
            'How do I get started with RWA?',
            'How do I start building or deploying a dApp?',
            'Where can I find funding or grants?'
        ],
        disclaimerText: 'My answers might not always be 100% accurate. Double-check when in doubt.',
        disclaimerLink: 'https://www.bnbchain.org/en/ai-bot-disclaimer',
        analyticsEvent: 'click_AiBot_floatBtn'
    };

    // ==================== State ====================
    var sdkButton = null;

    // ==================== Helper Functions ====================
    function findSdkButton() {
        var buttons = document.querySelectorAll('button');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            if (!btn.closest('.ai-bot-wrapper') && !btn.closest('dialog')) {
                var text = btn.textContent || '';
                if (text.indexOf('Ask AI') !== -1) {
                    return btn;
                }
            }
        }
        return null;
    }

    function triggerSdkButton() {
        if (!sdkButton) {
            sdkButton = findSdkButton();
        }
        if (sdkButton) {
            sdkButton.click();
        }
    }

    function trackAnalytics() {
        if (window.dataLayer) {
            window.dataLayer.push({ event: CONFIG.analyticsEvent });
        }
    }

    // ==================== Event Binding ====================
    function bindCustomButton() {
        var wrapper = document.querySelector('.ai-bot-wrapper');
        if (!wrapper) return;

        // Skip if already bound
        if (wrapper._boundClick) return;

        // Remove existing listeners by cloning
        var newWrapper = wrapper.cloneNode(true);
        wrapper.parentNode.replaceChild(newWrapper, wrapper);

        // Re-select after clone
        newWrapper = document.querySelector('.ai-bot-wrapper');
        if (!newWrapper) return;

        newWrapper.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            triggerSdkButton();
            trackAnalytics();
        });

        // Mark as bound
        newWrapper._boundClick = true;
    }

    // ==================== SDK Initialization ====================
    function initSuperIntern() {
        if (!window.SuperIntern) {
            console.warn('SuperIntern SDK not loaded');
            return;
        }

        window.SuperIntern.ChatButton({
            baseSettings: {
                apiKey: CONFIG.apiKey,
                environment: 'production',
                agentId: CONFIG.agentId,
                modeShortId: CONFIG.modeShortId,
                primaryBrandColor: CONFIG.primaryBrandColor,
                theme: { colorMode: { type: 'dark' } }
            },
            aiChatSettings: {
                botAvatarSrcUrl: CONFIG.botAvatar,
                aiAssistantName: CONFIG.botName,
                introMessage: CONFIG.introMessage,
                quickQuestions: CONFIG.quickQuestions,
                disclaimer: {
                    text: CONFIG.disclaimerText,
                    link: CONFIG.disclaimerLink
                }
            },
            modalSettings: {
                onOpenChange: function(isOpen) {
                    console.log('Modal:', isOpen ? 'opened' : 'closed');
                }
            },
            label: 'Ask AI',
            // Visually hide SDK button (still functional for click events)
            style: {
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0,0,0,0)',
                border: '0',
                opacity: '0'
            }
        });

        // Cache SDK button reference
        setTimeout(function() {
            sdkButton = findSdkButton();
            bindCustomButton();
        }, 100);
    }

    // ==================== SPA Navigation Support ====================
    function rebindAfterNavigation() {
        // Re-find SDK button (it may have been re-rendered)
        sdkButton = null;
        setTimeout(function() {
            sdkButton = findSdkButton();
            bindCustomButton();
        }, 100);
        // Double-check after a longer delay for slow page transitions
        setTimeout(function() {
            if (!sdkButton) sdkButton = findSdkButton();
            bindCustomButton();
        }, 500);
        setTimeout(function() {
            if (!sdkButton) sdkButton = findSdkButton();
            bindCustomButton();
        }, 1000);
    }

    function setupSpaSupport() {
        // Handle pushState
        var originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            rebindAfterNavigation();
        };

        // Handle replaceState
        var originalReplaceState = history.replaceState;
        history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            rebindAfterNavigation();
        };

        // Handle popstate (back/forward)
        window.addEventListener('popstate', rebindAfterNavigation);

        // Handle hashchange
        window.addEventListener('hashchange', rebindAfterNavigation);

        // MutationObserver for DOM changes (covers Discourse and other SPAs)
        var observer = new MutationObserver(function(mutations) {
            var shouldRebind = false;
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                // Check if our wrapper was removed or major DOM changes occurred
                if (mutation.removedNodes.length > 0) {
                    for (var j = 0; j < mutation.removedNodes.length; j++) {
                        var node = mutation.removedNodes[j];
                        if (node.nodeType === 1 &&
                            (node.classList && node.classList.contains('ai-bot-wrapper') ||
                                node.querySelector && node.querySelector('.ai-bot-wrapper'))) {
                            shouldRebind = true;
                            break;
                        }
                    }
                }
            }
            if (shouldRebind) {
                rebindAfterNavigation();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Periodic check as fallback (every 2 seconds)
        setInterval(function() {
            var wrapper = document.querySelector('.ai-bot-wrapper');
            if (wrapper && !wrapper._boundClick) {
                rebindAfterNavigation();
            }
        }, 2000);
    }

    // ==================== Bootstrap ====================
    function init() {
        if (window.SuperIntern) {
            initSuperIntern();
        } else {
            window.addEventListener('load', initSuperIntern);
        }
        setupSpaSupport();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();