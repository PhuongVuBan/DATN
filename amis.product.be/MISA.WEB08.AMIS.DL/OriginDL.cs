﻿using MISA.WEB08.AMIS.Common.Entities;

namespace MISA.WEB08.AMIS.DL
{
    /// <summary>
    /// Dữ liệu thao tác với Database và trả về với bảng Unit từ tầng DL
    /// </summary>
    /// Create by: HAN (21/09/2022)
    public class OriginDL : BaseDL<Origin>, IOriginDL
    {
        #region Field

        private IDatabaseHelper<Origin> _dbHelper;

        #endregion

        #region Contructor

        public OriginDL(IDatabaseHelper<Origin> dbHelper) : base(dbHelper)
        {
            _dbHelper = dbHelper;
        }

        #endregion

        #region Method

        #endregion
    }
}
