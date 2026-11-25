use windows::core::w;
use windows::Win32::Foundation::{BOOL, HWND, LPARAM, WPARAM};
use windows::Win32::UI::WindowsAndMessaging::{
    EnumWindows, FindWindowExW, FindWindowW, GetSystemMetrics, GetWindowLongPtrW,
    SendMessageTimeoutW, SetParent, SetWindowLongPtrW, SetWindowPos, GWL_EXSTYLE, GWL_STYLE,
    SMTO_NORMAL, SM_CXSCREEN, SM_CYSCREEN, SM_XVIRTUALSCREEN, SM_YVIRTUALSCREEN, SWP_FRAMECHANGED,
    SWP_NOACTIVATE, SWP_NOZORDER, SWP_SHOWWINDOW, WS_CAPTION, WS_CHILD, WS_EX_APPWINDOW,
    WS_EX_NOACTIVATE, WS_EX_TOOLWINDOW, WS_MAXIMIZEBOX, WS_MINIMIZEBOX, WS_POPUP, WS_SYSMENU,
    WS_THICKFRAME, WS_VISIBLE,
};

unsafe extern "system" fn find_workerw_proc(top_hwnd: HWND, lparam: LPARAM) -> BOOL {
    let Ok(def_view) = FindWindowExW(top_hwnd, None, w!("SHELLDLL_DefView"), None) else {
        return BOOL(1);
    };
    if def_view.0.is_null() {
        return BOOL(1);
    }

    if let Ok(worker) = FindWindowExW(None, top_hwnd, w!("WorkerW"), None) {
        if !worker.0.is_null() {
            let out_ptr = lparam.0 as *mut HWND;
            if !out_ptr.is_null() {
                *out_ptr = worker;
                return BOOL(0);
            }
        }
    }

    BOOL(1)
}

/// Attaches the Starlight window behind Windows desktop icons (`Progman` -> `WorkerW`).
pub fn attach_to_desktop(raw_hwnd: isize) -> bool {
    if raw_hwnd == 0 {
        return false;
    }

    unsafe {
        let hwnd = HWND(raw_hwnd as *mut core::ffi::c_void);
        let Ok(progman) = FindWindowW(w!("Progman"), None) else {
            eprintln!("[starlight] failed to find Progman window for wallpaper mode");
            return false;
        };

        // Ask Explorer to spawn the WorkerW layer behind desktop icons
        let mut msg_result: usize = 0;
        let _ = SendMessageTimeoutW(
            progman,
            0x052C,
            WPARAM(0xD),
            LPARAM(0x1),
            SMTO_NORMAL,
            1000,
            Some(&mut msg_result),
        );

        let mut workerw = HWND::default();
        let _ = EnumWindows(
            Some(find_workerw_proc),
            LPARAM(&mut workerw as *mut HWND as isize),
        );

        // Windows 11 24H2+ may parent WorkerW directly under Progman
        if workerw.0.is_null() {
            if let Ok(child_worker) = FindWindowExW(progman, None, w!("WorkerW"), None) {
                workerw = child_worker;
            }
        }

        if workerw.0.is_null() {
            workerw = progman;
        }

        if SetParent(hwnd, workerw).is_err() {
            eprintln!("[starlight] SetParent to desktop WorkerW failed");
            return false;
        }

        let style = GetWindowLongPtrW(hwnd, GWL_STYLE) as u32;
        let cleared_style = style
            & !(WS_POPUP.0
                | WS_CAPTION.0
                | WS_THICKFRAME.0
                | WS_MINIMIZEBOX.0
                | WS_MAXIMIZEBOX.0
                | WS_SYSMENU.0);
        let new_style = cleared_style | WS_CHILD.0 | WS_VISIBLE.0;
        SetWindowLongPtrW(hwnd, GWL_STYLE, new_style as isize);

        let ex_style = GetWindowLongPtrW(hwnd, GWL_EXSTYLE) as u32;
        let new_ex_style =
            (ex_style & !WS_EX_APPWINDOW.0) | WS_EX_TOOLWINDOW.0 | WS_EX_NOACTIVATE.0;
        SetWindowLongPtrW(hwnd, GWL_EXSTYLE, new_ex_style as isize);

        // Position on the primary display in WorkerW local coordinates
        let vx = GetSystemMetrics(SM_XVIRTUALSCREEN);
        let vy = GetSystemMetrics(SM_YVIRTUALSCREEN);
        let x = -vx;
        let y = -vy;
        let w = GetSystemMetrics(SM_CXSCREEN).max(640);
        let h = GetSystemMetrics(SM_CYSCREEN).max(480);

        let _ = SetWindowPos(
            hwnd,
            None,
            x,
            y,
            w,
            h,
            SWP_NOZORDER | SWP_NOACTIVATE | SWP_FRAMECHANGED | SWP_SHOWWINDOW,
        );

        eprintln!(
            "[starlight] attached window to Windows desktop wallpaper (WorkerW {:?}, {}x{} at {},{})",
            workerw.0, w, h, x, y
        );
        true
    }
}
